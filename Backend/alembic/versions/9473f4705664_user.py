"""user

Revision ID: 9473f4705664
Revises: c923848aa989
Create Date: 2022-06-17 15:12:22.480043

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9473f4705664'
down_revision = '19fc0f9026aa'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'user',
        sa.Column('user_id', sa.Integer, primary_key=True),
        sa.Column('first_name', sa.String(50), nullable=False),
        sa.Column('last_name', sa.String(50), nullable=False),
        sa.Column('password', sa.String(500), nullable=False),
        sa.Column('email', sa.String(100), nullable=False),
        sa.Column('company_id', sa.Integer, nullable=False)
    )


def downgrade():
    op.drop_table('user')
