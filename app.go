package main

import (
	"log"
	"github.com/gofiber/fiber/v2"
)

type Sms struct {
	Sender string `json:"sender"`
	Timestamp string `json:"timestamp"`
	Message string `json:"message"`
}
type UpdateRequest struct {
	Id string `json:"id"`
	Messages []Sms `json:"messages"`
}

var messageStore []Sms

func main() {
    app := fiber.New()

    app.Get("/", func(c *fiber.Ctx) error {
	    return c.JSON(fiber.Map{
		    "messages": messageStore,
	    })
    })

    app.Post("/update", func(c *fiber.Ctx) error {
	    body := new(UpdateRequest)
	    if err := c.BodyParser(body); err != nil {
		    return c.Status(fiber.StatusUnprocessableEntity).JSON(fiber.Map{
			    "errors": err.Error(),
		    })
	    }
	    log.Printf("receive request %v", *body)
	    messageStore = body.Messages
	    return c.JSON(fiber.Map{"succeed": "true"})
    })

    app.Listen(":8080")
}
