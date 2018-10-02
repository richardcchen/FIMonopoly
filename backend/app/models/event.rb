class Event < ApplicationRecord
  has_many :grids
  has_many :users, through: :grids
end
