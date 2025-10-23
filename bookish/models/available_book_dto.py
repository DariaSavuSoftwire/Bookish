class AvailableBookDTO():

    def __init__(self, book_title, book_id, authors, copies_available, copies_owned):
        self.book_title = book_title
        self.book_id = book_id
        self.authors = authors
        self.copies_owned = copies_owned
        self.copies_available = copies_available
        self.return_date = None
        self.user_to_return = None

    def set_return_date(self, return_date):
        self.return_date = return_date

    def set_user_to_return(self, user_ro_return):
        self.user_to_return = user_ro_return

    def serialize(self):
        return {
            'book_title': self.book_title,
            'book_id': self.book_id,
            'authors': [author.name for author in self.authors],
            'copies_owned': self.copies_owned,
            'copies_available': self.copies_available,
            'return_date': self.return_date,
            'user_to_return': self.user_to_return
        }