require 'spec_helper'
require 'rails_helper'

RSpec.describe Job do
  it { should have_valid(:date).when('April 20, 2017', '4/20/2017') }
  it { should_not have_valid(:date).when(nil, '') }

  it { should have_valid(:author).when('Ryan', 'Dobrinski') }
  it { should_not have_valid(:author).when(nil, '') }

  it { should have_valid(:category).when('landscaping', 'cleaning') }
  it { should_not have_valid(:category).when(nil, "") }

  it { should have_valid(:location).when('cambridge', 'boston') }
  it { should_not have_valid(:location).when(nil, '') }

  it { should have_valid(:status).when('new', 'pending') }
  it { should_not have_valid(:status).when(nil, '') }
end
