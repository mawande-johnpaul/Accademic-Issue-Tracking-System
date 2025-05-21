from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import Issue, Notification
from django.contrib.auth import get_user_model

User = get_user_model()

@receiver(pre_save, sender=Issue)
def issue_status_change_notify(sender, instance, **kwargs):
    if not instance.pk:
        return

    try:
        old_instance = Issue.objects.get(pk=instance.pk)
    except Issue.DoesNotExist:
        return

    if old_instance.status != instance.status:
        recipient = instance.created_by

        Notification.objects.create(
            user_id_sender=User.pk,
            user_id_receiver=recipient,
            content=f"Issue '{instance.title}' is '{instance.status}'.",
            category = 'announcement'
        )