class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.date :due_date, null: false
      t.boolean :completed, default: false

      t.timestamps
    end
  end
end
