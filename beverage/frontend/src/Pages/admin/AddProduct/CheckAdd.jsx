const hasErrors = (errors) => {
    for (const key in errors) {
        if (errors[key] !== '') {
            return true; // Trả về true nếu có bất kỳ lỗi nào tồn tại.
        }
    }
    return false; // Trả về false nếu không có lỗi nào tồn tại.
};
export default hasErrors;