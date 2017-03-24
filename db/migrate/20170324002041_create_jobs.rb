class CreateJobs < ActiveRecord::Migration
  def change
    create_table :jobs do |t|
      t.date :date
      t.string :author
      t.string :category
      t.string :location
      t.string :status

      t.timestamps null: false
    end
  end
end
