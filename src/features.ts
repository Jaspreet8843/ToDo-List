export async function Toast(message:string, duration= 2000) {
    const toast = document.createElement('ion-toast');
    toast.message = message;
    toast.duration = duration;
    toast.cssClass = "ion-text-center";
  
    document.body.appendChild(toast);
    return toast.present();
  }
  
export async function ToastOptions(header:string, message:string) {
    const toast = document.createElement('ion-toast');
    toast.header = header;
    toast.message = message;
    toast.position = 'top';
    toast.buttons = [
      {
        side: 'start',
        icon: 'star',
        text: 'Favorite',
        handler: () => {
          console.log('Favorite clicked');
        },
      },
      {
        text: 'Done',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        },
      },
    ];
  
    document.body.appendChild(toast);
    await toast.present();
  
    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }