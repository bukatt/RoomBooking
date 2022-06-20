"""room

Revision ID: c923848aa989
Revises: 8a4b051485a6
Create Date: 2022-06-17 14:44:59.823257

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c923848aa989'
down_revision = '9473f4705664'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'room',
        sa.Column('room_id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(50), nullable=False),
        sa.Column('bookings', sa.String(50), nullable=False),
        sa.Column('company_id', sa.Integer, nullable=False)
    )


def downgrade():
    pass
