from bookish.models import Author, BookAuthors


def delete_book_authors(authors_to_remove, current_book, db):
    for author_name in authors_to_remove:
        author = Author.query.filter_by(name=author_name).first()
        if not author:
            continue
        book_author = BookAuthors.query.filter_by(ISBN=current_book.ISBN, author_id=author.id).first()
        if book_author:
            db.session.delete(book_author)


def add_book_authors(authors_to_add, current_book, db):
    for author_name in authors_to_add:
        author = Author.query.filter_by(name=author_name).first()
        if not author:
            author = Author(name=author_name)
            db.session.add(author)
            db.session.flush()
        book_author = BookAuthors(ISBN=current_book.ISBN, author_id=author.id)
        db.session.add(book_author)
