/* eslint-disable @typescript-eslint/no-empty-function */
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Timeline from './pages/Timeline'
import Profile from './pages/Profile'
import MyBuus from './pages/MyBuus'
import RetDetail from './pages/RetDetail'
import ProtectedRoute from './routesProtected'
import React, { useState } from 'react'
import SearchPage from './pages/SearchPage'

const Rotas = () => {
  return (
    <Routes>
      <Route path="/login" element={<Home />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Timeline />
          </ProtectedRoute>
        }
      />
      <Route
        path="/buus"
        element={
          <ProtectedRoute>
            <MyBuus />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ret/:id"
        element={
          <ProtectedRoute>
            <RetDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/:username"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
export default Rotas
