declare var $: any;

export class Utility {

  static notification = (type: String, title: String, msg: String, icon: String) => {

    $.notify({
        url: icon,
        message: msg,
        title: title

    }, {
            type: type,
            timer: 200,
            placement: {
                from: 'top',
                align: 'right'
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
                '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
                '<i class="material-icons" data-notify="icon">{3}</i> ' +
                '<span data-notify="title">{1}</span> ' +
                '<span data-notify="message">{2} !</span>' +
                '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
                '</div>' +
                '</div>'
        });

}

}
