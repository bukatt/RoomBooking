"""room booking

Revision ID: 19fc0f9026aa
Revises: 9473f4705664
Create Date: 2022-06-17 14:45:29.269826

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '19fc0f9026aa'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'room_booking',
        sa.Column('room_booking_id', sa.Integer, primary_key=True),
        sa.Column('room_id', sa.Integer, nullable=False),
        sa.Column('user_id', sa.Integer, nullable=True),
        sa.Column('start_time', sa.Time, nullable=False)

    )


def downgrade():
    pass
