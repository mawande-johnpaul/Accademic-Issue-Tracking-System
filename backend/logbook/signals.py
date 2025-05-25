from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import Issue, Notification
from django.contrib.auth import get_user_model

User = get_user_model()
# Signal receiver to notify user when the status of their issue changes
@receiver(pre_save, sender=Issue)
def issue_status_change_notify(sender, instance, **kwargs):
    # Only proceed if the instance already exists i.e., is being updated
    if not instance.pk:
        return

    try:
        # Fetch the current state of the issue from the database
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

