FROM golang:1.23 AS build-stage
WORKDIR /app
COPY *.go ./
COPY go.mod go.sum ./
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux go build -o /server
ENV XPI_URL="https://addons.mozilla.org/firefox/downloads/file/4332091/greasemonkey-4.13.xpi"
RUN curl -L $XPI_URL -o /greasemonkey.xpi

# Deploy the application binary into a firefox
FROM lscr.io/linuxserver/firefox:latest AS release-stage
COPY --from=build-stage /server /
COPY --from=build-stage /greasemonkey.xpi /usr/lib/firefox/distribution/extensions/{e4a8a97b-f2ed-450b-b12d-ee082ba24781}.xpi
COPY gvoice.user.js /gvoice.user.js
COPY autostart /defaults/autostart
EXPOSE 8080
