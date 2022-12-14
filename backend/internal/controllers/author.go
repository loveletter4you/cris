package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/loveletter4u/cris/internal/model"
	"github.com/loveletter4u/cris/internal/storage"
	"net/http"
	"strconv"
	"strings"
)

// Контролеры для роутов, тут обращаемся к методам сторейджа,
// которые вернут репозитории и в них уже работаем с методами которые отправляют запросики в базу данных

func GetAuthors(s *storage.Storage) func(c *gin.Context) {
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
		search := c.DefaultQuery("search", "")
		var authors []*model.Author
		var authorCount int
		if search == "" {
			authors, err = s.Author().GetAuthors(page, limit)
			if err != nil {
				c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
				return
			}
			authorCount, err = s.Author().GetAuthorsCount()
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
		} else {
			search = strings.ToLower(search)
			authors, err = s.Author().GetAuthorsSearch(page, limit, search)
			if err != nil {
				c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
				return
			}
			authorCount, err = s.Author().GetAuthorsSearchCount(search)
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
		}
		response := map[string]interface{}{
			"authors":       authors,
			"total_authors": authorCount,
		}
		c.JSON(http.StatusOK, response)
	}
}

func GetAuthorById(s *storage.Storage) func(c *gin.Context) {
	return func(c *gin.Context) {
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		author, err := s.Author().GetAuthorById(id)
		if err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
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

func GetAuthorPublications(s *storage.Storage) func(c *gin.Context) {
	return func(c *gin.Context) {
		id, err := strconv.Atoi(c.Param("id"))
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		publications, err := s.Author().GetAuthorPublicationsById(id)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		response := map[string]interface{}{
			"publications": publications,
		}
		c.JSON(http.StatusOK, response)
	}
}
