package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/loveletter4u/cris/internal/storage"
	"net/http"
	"strconv"
)

func GetPublications(s *storage.Storage) func(c *gin.Context) {
	return func(c *gin.Context) {
		page, err := strconv.Atoi(c.DefaultQuery("page", "0"))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		limit, err := strconv.Atoi(c.DefaultQuery("limit", "20"))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		publications, err := s.Publication().GetPublications(page, limit)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		publicationCount, err := s.Publication().GetPublicationCount()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		response := map[string]interface{}{
			"publications":       publications,
			"total_publications": publicationCount,
		}
		c.JSON(http.StatusOK, response)
	}
}