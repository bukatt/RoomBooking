"""company

Revision ID: 8a4b051485a6
Revises:
Create Date: 2022-06-17 14:55:50.317741

"""
from enum import unique
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8a4b051485a6'
down_revision = 'c923848aa989'
branch_labels = None
depends_on = None


def upgrade():
     op.create_table(
        'company',
        sa.Column('company_id', sa.Integer, primary_key=True),
        sa.Column('company_name', sa.String(50), nullable=False),
        sa.Column('domain', sa.String(15), nullable=False)
    )


def downgrade():
    pass
