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

func setupPost() (*repositories.PostRepository, func()) {
	db := external.DB.Begin()
	repo := repositories.NewPostRepository(db)
	teardown := func() {
		db.Rollback()
	}
	// TODO: test用のテーブルを作成する

	return repo, teardown
}

func TestGetAllPosts(t *testing.T) {
	repo, teardown := setupPost()
	defer teardown()


	// Valid testcases
	testcases := []struct {
		NumData    int
	}{
		{1},
	}

	for _, tc := range testcases {
		t.Run(fmt.Sprintf("NumData = %d should returns more than %d", tc.NumData, tc.NumData), func(t *testing.T) {
			result, err := repo.GetAllPosts()
			if err != nil {
				t.Errorf("Repository returns error: %v", err.Error())
			}
			if result == nil {
				t.Error("Nil")
			} else if len(result) < tc.NumData {
				t.Errorf("Wrong value: %+v", result)
			}
		})
	}
}
