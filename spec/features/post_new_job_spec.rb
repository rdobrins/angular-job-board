require 'spec_helper'
# User Posts New Job

# [X] As a user I want to be able to post a new job

feature 'user posts new job' do
  before(:each) do
    visit root_path
    find("a", :text => "Post New Job").click
  end

  scenario 'visitor submits message' do
    # print page.body
    fill_in 'dateField', with: 'May 17, 2017'
    fill_in 'authorField', with: 'Ryan'
    select "Boston", :from => "locationSelect"
    select "New", :from => "locationSelect"
    select "Landscaping", :from => "locationSelect"
    click_on 'Post Job'
    expect(page).to have_content("BOSTON")
  end

  # scenario 'user edits job' do
  #   click_on 'Edit'
  # end
end
