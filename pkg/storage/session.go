package storage

import (
	"sync"
	"time"
)

// Session represents a user session
type Session struct {
	ID        string
	CreatedAt time.Time
	LastSeen  time.Time
	Data      map[string]interface{}
}

// SessionStore manages user sessions
type SessionStore struct {
	mu       sync.RWMutex
	sessions map[string]*Session
}

// NewSessionStore creates a new session store
func NewSessionStore() *SessionStore {
	return &SessionStore{
		sessions: make(map[string]*Session),
	}
}

// CreateSession creates a new session
func (s *SessionStore) CreateSession() *Session {
	s.mu.Lock()
	defer s.mu.Unlock()

	session := &Session{
		ID:        generateUUID(),
		CreatedAt: time.Now(),
		LastSeen:  time.Now(),
		Data:      make(map[string]interface{}),
	}

	s.sessions[session.ID] = session
	return session
}

// GetSession retrieves a session by ID
func (s *SessionStore) GetSession(id string) (*Session, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	session, exists := s.sessions[id]
	if exists {
		session.LastSeen = time.Now()
	}
	return session, exists
}

// DeleteSession removes a session
func (s *SessionStore) DeleteSession(id string) {
	s.mu.Lock()
	defer s.mu.Unlock()

	delete(s.sessions, id)
}

// CleanupExpiredSessions removes sessions that haven't been accessed in the specified duration
func (s *SessionStore) CleanupExpiredSessions(maxAge time.Duration) {
	s.mu.Lock()
	defer s.mu.Unlock()

	now := time.Now()
	for id, session := range s.sessions {
		if now.Sub(session.LastSeen) > maxAge {
			delete(s.sessions, id)
		}
	}
}

func generateUUID() string {
	return time.Now().Format("20060102150405.000000000")
}
