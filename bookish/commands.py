import click
from flask.cli import with_appcontext
from bookish.db_setup import db
from bookish.models import User

@click.command(name='create-admin')
@with_appcontext
def create_admin_command():
    if User.query.filter_by(username='admin').first():
        click.echo("Admin user already exists.")
        return

    admin_user = User(username='admin', name='Administrator')
    admin_user.set_password('admin')
    admin_user.set_role('ADMIN')

    db.session.add(admin_user)
    db.session.commit()

    click.echo("Admin user created successfully!")
    click.echo("Username: admin")
    click.echo("Password: admin")

def register_commands(app):
    app.cli.add_command(create_admin_command)