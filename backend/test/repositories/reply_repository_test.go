package repositories

import (
	"fmt"
	"myapp/internal/external"
	"myapp/internal/repositories"
	"testing"
)

func init() {
	external.SetupDB()
}

func setupReply() (*repositories.ReplyRepository, func()) {
	db := external.DB.Begin()
	repo := repositories.NewReplyRepository(db)
	teardown := func() {
		db.Rollback()
	}
	// TODO: test用のテーブルを作成する

	return repo, teardown
}

func TestGetRepliesByPostId(t *testing.T) {
	repo, teardown := setupReply()
	defer teardown()

	// Valid testcases
	testcases := []struct {
		postId    int
		dataExist bool
	}{
		{1, true},
		{-1, false},
	}

	for _, tc := range testcases {
		var existsOrNotStr string
		if tc.dataExist { existsOrNotStr = "exist" } else { existsOrNotStr = "don't exist" }
		t.Run(fmt.Sprintf("post_id = %d: data %s", tc.postId, existsOrNotStr), func(t *testing.T) {
			result, err := repo.GetRepliesByPostId(tc.postId)
			if err != nil {
				t.Errorf("Repository returns error: %v", err.Error())
			}
			if tc.dataExist {
				if result == nil {
					t.Errorf("replies should exists")
				}
			} else {
				if result != nil {
					t.Errorf("replies should not exists")
				}
			}
		})
	}
}
