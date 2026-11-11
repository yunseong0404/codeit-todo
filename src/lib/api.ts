import { Todo } from "@/types/todo";
import api from "@/lib/axios";

//아이템 등록 api
export async function postTodo(name: string) {
    const { data } = await api.post("/items", {name});
    return data;
}

//아이템 조회 api
export async function getTodos() {
    const { data } = await api.get("/items", {
        params: { pageSize: 100},
    });
    return data;
}

//아이템 상세 조회 api
export async function getTodoById(itemId: number) {
    const { data } = await api.get(`/items/${itemId}`);
    return data;
}

//아이템 수정 api
export async function updateItem(itemId: number, item: Partial<Todo>) {
    const { data } = await api.patch(`/items/${itemId}`, item);
    return data;
    
}

//아이템 삭제 api
export async function deleteItem(itemId: number) {
    const { data } = await api.delete(`/items/${itemId}`);
    return data;
}

 //이미지 업로드 api
export async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append("image", file);

    const { data } = await api.post("/images/upload", formData);
    return data.url;
    
}



