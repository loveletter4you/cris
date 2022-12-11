package storage

import (
	"fmt"
	"github.com/loveletter4u/cris/internal/model"
)

type AuthorRepository struct {
	storage *Storage
}

func (ar *AuthorRepository) GetAuthorById(id int) (*model.Author, error) {
	author := &model.Author{}
	query := fmt.Sprintf("SELECT id, name, surname, patronymic, user_id FROM authors WHERE id = %d", id)
	err := ar.storage.db.QueryRow(query).Scan(&author.Id, &author.Name, &author.Surname, &author.Patronymic, &author.UserID)
	return author, err
}

func (ar *AuthorRepository) AddAuthor(author *model.Author) error {
	query := fmt.Sprintf("INSERT INTO authors (name, surname, patronymic) VALUES ('%s', '%s', '%s') RETURNING id",
		author.Name, author.Surname, author.Patronymic)
	err := ar.storage.db.QueryRow(query).Scan(&author.Id)
	return err
}

func (ar *AuthorRepository) AddAuthorIdentifier(authorIdentifier *model.AuthorIdentifier) error {
	query := fmt.Sprintf("INSERT INTO author_identifier (author_id, identifier_id, identifier) "+
		"VALUES (%d, %d, '%s') RETURNING id",
		authorIdentifier.Author.Id, authorIdentifier.Identifier.Id, authorIdentifier.IdentifierValue)
	err := ar.storage.db.QueryRow(query).Scan(&authorIdentifier.Id)
	return err
}

func (ar *AuthorRepository) GetAuthorIdentifiers(author *model.Author) ([]*model.AuthorIdentifier, error) {
	authorIdentifiers := make([]*model.AuthorIdentifier, 0)
	query := fmt.Sprintf("SELECT author_identifier.id , "+
		"author_identifier.identifier_id, author_identifier.identifier, identifiers.name "+
		"FROM author_identifier, identifiers "+
		"WHERE author_id = %d AND author_identifier.identifier_id = identifiers.id", author.Id)
	rows, err := ar.storage.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		authorIdentifier := &model.AuthorIdentifier{
			Identifier: &model.Identifier{},
		}
		if err := rows.Scan(&authorIdentifier.Id, &authorIdentifier.Identifier.Id,
			&authorIdentifier.IdentifierValue, &authorIdentifier.Identifier.Name); err != nil {
			return nil, err
		}
		authorIdentifiers = append(authorIdentifiers, authorIdentifier)
	}
	return authorIdentifiers, nil
}

func (ar *AuthorRepository) GetAuthors() ([]*model.Author, error) {
	authors := make([]*model.Author, 0)
	query := "SELECT id, name, surname, patronymic, user_id FROM authors"
	rows, err := ar.storage.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		author := &model.Author{}
		if err := rows.Scan(&author.Id, &author.Name, &author.Surname, &author.Patronymic, &author.UserID); err != nil {
			return nil, err
		}
		authors = append(authors, author)
	}
	return authors, nil
}
