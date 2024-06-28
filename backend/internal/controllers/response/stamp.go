package response

type Stamp struct {
	Name string `json:"name"`
	UserIds []int`json:"users"`
	Count int`json:"count"`
}
