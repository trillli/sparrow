# Generated by Django 3.2.8 on 2024-02-26 14:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('daybreakr_data', '0004_rename_userid_lazyalarm_user_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='lazyalarm',
            old_name='serialization',
            new_name='alarms_json',
        ),
        migrations.RemoveField(
            model_name='lazyalarm',
            name='id',
        ),
        migrations.AlterField(
            model_name='lazyalarm',
            name='user_id',
            field=models.CharField(max_length=512, primary_key=True, serialize=False),
        ),
    ]