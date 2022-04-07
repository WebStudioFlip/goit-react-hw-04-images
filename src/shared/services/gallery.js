import axios from "axios";

const PER_PAGE = 12;
const instance = axios.create({
    baseURL: "https://pixabay.com/api",
    params: {
        "per_page": PER_PAGE,
        "key": "25431607-9b845b328937ccad399b1bbc0",
        "image_type":"photo",
        "orientation": "horizontal"
    }
})

export const searchGallery = async (page = 1, q = "") => {
    const {data} = await instance.get("/", {
        params: {
            page,
            q
        }
    });
    return data;
}
