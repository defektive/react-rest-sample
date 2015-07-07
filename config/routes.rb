# config/routes.rb
Rails.application.routes.draw do
  devise_for :user, only: []

  namespace :v1, defaults: { format: :json } do
    resource :login, only: [:create], controller: :sessions
    resource :login, only: [:create], controller: :sessions
    resources :users, except: [:new, :edit]
  end
end
