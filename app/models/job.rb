class Job < ActiveRecord::Base
  validates :date, presence: true
  validates :author, presence: true
  validates :category, presence: true
  validates :location, presence: true
  validates :status, presence: true
end
