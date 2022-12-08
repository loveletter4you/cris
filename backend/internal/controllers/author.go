package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/loveletter4u/cris/internal/storage"
	"net/http"
	"strconv"
)

func GetAuthorById(s *storage.Storage) func(c *gin.Context) {
	return func(c *gin.Context) {
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		author, err := s.Author().GetAuthorById(id)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		authorIdentifiers, err := s.Author().GetAuthorIdentifiers(author)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		response := map[string]interface{}{
			"author":      author,
			"identifiers": authorIdentifiers,
		}
		c.JSON(http.StatusOK, response)
	}
}
