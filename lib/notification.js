import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function getNotificationPermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Permission not granted!');
    return false;
  }
  return true;
}

export async function scheduleWeeklyNotifications() {
  const permission = await getNotificationPermission();
  if (!permission) return;

  await Notifications.cancelAllScheduledNotificationsAsync();

  const days = ['Monday', 'Wednesday', 'Friday'];
  const daysOffset = { Monday: 1, Wednesday: 3, Friday: 5 };

  days.forEach(day => {
    const trigger = new Date();
    const today = trigger.getDay();
    const targetDay = daysOffset[day];

    if (today > targetDay) {
      trigger.setDate(trigger.getDate() + ((7 + targetDay - today) % 7));
    } else if (today < targetDay) {
      trigger.setDate(trigger.getDate() + (targetDay - today));
    } else {
      trigger.setDate(trigger.getDate() + 7);
    }

    trigger.setHours(8);
    trigger.setMinutes(15);
    trigger.setSeconds(0);

    trigger.setDate(trigger.getDate() - 1);

    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Pemeriksaan Mingguan',
        body: `Jangan lupa persiapan untuk pemeriksaan hari ${day}!`,
        sound: 'default',
      },
      trigger: {
        hour: trigger.getHours(),
        minute: trigger.getMinutes(),
        repeats: true,
        weekday: trigger.getDay() + 1,
      },
    });
  });
}