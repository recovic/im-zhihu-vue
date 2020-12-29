function toastDanger(ctx, title, message) {
    ctx.$bvToast.toast(message, {
        title: title,
        variant: "danger",
        solid: true,
    });
}

function toastSuccess(ctx, title, message) {
    ctx.$bvToast.toast(message, {
        title: title,
        variant: "success",
        solid: true,
    });
}

export default {
    toastDanger,
    toastSuccess
}