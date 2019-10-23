Rails.application.routes.draw do
  resources :oscillators
  root to: 'oscillators#index'
end
