function parseClerkUserData(data: any) {
    return {
        id: data.id,
        name: `${data.first_name} ${data.last_name}`,
        email: data.email_addresses?.[0]?.email_address || "unknown@example.com",
        imageUrl: data.image_url,
    };
}
