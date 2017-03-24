class JobsController < ApplicationController
  respond_to :json
  def index
    respond_to do |format|
      format.json { render json: Job.all }
      format.html
    end
  end

  def create
    respond_with Job.create(job_params)
  end

  def update
    respond_with Job.update(params[:id], job_params)
  end

  def destroy
    respond_with Job.destroy(params[:id])
  end

private
  def job_params
    params.require(:job).permit(:date, :author, :category, :location, :status,)
  end
end
