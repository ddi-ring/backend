import ddi from "@ddi-ring/api";

export const 카드_생성_시나리오_예시 = async (connection: ddi.IConnection) => {
    const res2 = await ddi.functional.event_card_files.create(connection, {
        name: "image_1123",
        extension: "jpeg",
        type: "thumbnail_image",
    });

    if (res2.status !== 201) throw Error("");

    const res3 = await ddi.functional.event_cards.create(connection, {
        template_key: "example template",
        thumbnail_image_id: res2.data.event_card_file_id,
        title: "Sample Title",
        address: "Sample Address",
        address_detail: "Sample Address Detail",
        event_time: new Date().toISOString(),
        invitation_message: "Sample Invitation Message",
        password: "Sample Password",
    });
    if (res3.status !== 201) throw Error("");

    const res4 = await ddi.functional.event_cards.get(connection, res3.data.event_card_id);
    if (res4.status !== 200) throw Error("");

    const card = res4.data;

    console.log(card);
};
