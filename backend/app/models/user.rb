class User < ApplicationRecord
  has_many :grids
  has_many :events, through: :grids
end
