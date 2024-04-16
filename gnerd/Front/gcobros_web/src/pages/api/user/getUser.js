const ip  = process.env.NEXT_PUBLIC_HOST
export async function login({username, password}) {
    const res = await fetch(`${ip}/login`, {
        method: "post",
        headers: {"Content-Type": "application/json"},
        body: {
            username: username,
            password: password,
        }
    });
    return res;
}