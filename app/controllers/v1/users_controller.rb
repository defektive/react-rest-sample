module V1
  class UsersController < ApplicationController
    skip_before_action :authenticate_user_from_token!, only: [:create]
    before_action :set_user, only: [:show, :update, :destroy]
    before_action :is_authorized!

    # POST /v1/users
    # Creates an user
    def create
      @user = User.new user_params

      if @user.save
        render json: @user, serializer: V1::SessionSerializer, root: nil
      else
        render json: { error: t('user_create_error') }, status: :unprocessable_entity
      end
    end
    # GET /user/1
    # GET /user/1.json
    def show
      render json: @user
    end

    private
    def set_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation)
    end

    def is_authorized!
      authentication_error unless devise_user == @user
    end
  end
end
