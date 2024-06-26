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
		if tc.dataExist {
			existsOrNotStr = "exist"
		} else {
			existsOrNotStr = "don't exist"
		}
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

func TestCreateReply(t *testing.T) {
	repo, teardown := setupReply()
	defer teardown()

	// Valid testcases
	testcases := []struct {
		postId     int
		userId     int
		content    string
		postExists bool
		userExists bool
	}{
		{1, 1, "テスト返信1", true, true},
		{-1, 1, "テスト返信2", false, true},
		{1, -1, "テスト返信3", true, false},
		{-1, -1, "テスト返信4", false, false},
	}

	for _, tc := range testcases {
		var avaiableOrNotStr string
		if tc.postExists && tc.userExists {
			avaiableOrNotStr = "insertable"
		} else {
			avaiableOrNotStr = "uninsertable"
		}
		t.Run(fmt.Sprintf("post_id = %d, user_id = %d, content = %s: %s", tc.postId, tc.userId, tc.content, avaiableOrNotStr), func(t *testing.T) {
			result, err := repo.CreateReply(tc.postId, tc.userId, tc.content)
			if !tc.postExists {
				if err == nil {
					t.Errorf("error must occur when post doen't exist.")
				}
			} else if !tc.userExists {
				if err == nil {
					t.Errorf("error must occur when user doen't exist.")
				}
			} else {
				if result == nil {
					t.Errorf("result is nil.")
				}
			}
		})
	}
}
