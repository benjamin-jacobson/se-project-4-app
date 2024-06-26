"""inital migration after db deletion

Revision ID: d7749a0fa1de
Revises: 
Create Date: 2024-06-11 01:40:45.332319

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd7749a0fa1de'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('activities',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('location', sa.String(), nullable=True),
    sa.Column('type', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('_password_hash', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_table('friends',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('birthday', sa.Date(), nullable=True),
    sa.Column('favorite_color', sa.String(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_friends_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('meetings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=True),
    sa.Column('friend_id', sa.Integer(), nullable=True),
    sa.Column('activity_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['activity_id'], ['activities.id'], name=op.f('fk_meetings_activity_id_activities')),
    sa.ForeignKeyConstraint(['friend_id'], ['friends.id'], name=op.f('fk_meetings_friend_id_friends')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('meetings')
    op.drop_table('friends')
    op.drop_table('users')
    op.drop_table('activities')
    # ### end Alembic commands ###
