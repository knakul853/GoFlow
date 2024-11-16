package runtime

import (
	"sync"
	"time"
)

// ChannelOperation represents the type of channel operation
type ChannelOperation string

const (
	Send    ChannelOperation = "send"
	Receive ChannelOperation = "receive"
	Close   ChannelOperation = "close"
)

// ChannelEvent represents a channel operation event
type ChannelEvent struct {
	ChannelID   uint64
	Operation   ChannelOperation
	GoroutineID uint64
	Timestamp   time.Time
	Blocked     bool
	BufferSize  int
	BufferUsed  int
}

// ChannelInfo stores information about a channel
type ChannelInfo struct {
	ID         uint64
	BufferSize int
	CreatedAt  time.Time
	Closed     bool
	Events     []ChannelEvent
}

// ChannelMonitor tracks channel operations and states
type ChannelMonitor struct {
	mu          sync.RWMutex
	channels    map[uint64]*ChannelInfo
	subscribers []func(ChannelEvent)
}

// NewChannelMonitor creates a new instance of ChannelMonitor
func NewChannelMonitor() *ChannelMonitor {
	return &ChannelMonitor{
		channels: make(map[uint64]*ChannelInfo),
	}
}

// Subscribe registers a callback for channel events
func (cm *ChannelMonitor) Subscribe(callback func(ChannelEvent)) {
	cm.mu.Lock()
	defer cm.mu.Unlock()
	cm.subscribers = append(cm.subscribers, callback)
}

// RegisterChannel registers a new channel for monitoring
func (cm *ChannelMonitor) RegisterChannel(id uint64, bufferSize int) {
	cm.mu.Lock()
	defer cm.mu.Unlock()

	cm.channels[id] = &ChannelInfo{
		ID:         id,
		BufferSize: bufferSize,
		CreatedAt:  time.Now(),
		Events:     make([]ChannelEvent, 0),
	}
}

// RecordEvent records a channel operation event
func (cm *ChannelMonitor) RecordEvent(event ChannelEvent) {
	cm.mu.Lock()
	defer cm.mu.Unlock()

	if channel, exists := cm.channels[event.ChannelID]; exists {
		channel.Events = append(channel.Events, event)
		
		// Update channel state
		if event.Operation == Close {
			channel.Closed = true
		}

		// Notify subscribers
		for _, subscriber := range cm.subscribers {
			subscriber(event)
		}
	}
}

// GetChannelInfo returns information about a specific channel
func (cm *ChannelMonitor) GetChannelInfo(id uint64) (*ChannelInfo, bool) {
	cm.mu.RLock()
	defer cm.mu.RUnlock()
	info, exists := cm.channels[id]
	return info, exists
}

// GetAllChannels returns information about all monitored channels
func (cm *ChannelMonitor) GetAllChannels() []ChannelInfo {
	cm.mu.RLock()
	defer cm.mu.RUnlock()

	channels := make([]ChannelInfo, 0, len(cm.channels))
	for _, info := range cm.channels {
		channels = append(channels, *info)
	}
	return channels
}

// DetectBlockedOperations identifies blocked channel operations
func (cm *ChannelMonitor) DetectBlockedOperations() []ChannelEvent {
	cm.mu.RLock()
	defer cm.mu.RUnlock()

	var blockedOps []ChannelEvent
	for _, channel := range cm.channels {
		for _, event := range channel.Events {
			if event.Blocked {
				blockedOps = append(blockedOps, event)
			}
		}
	}
	return blockedOps
}
