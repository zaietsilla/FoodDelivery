# Generated by Django 4.0.6 on 2022-07-09 16:48

import ckeditor.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', models.CharField(editable=False, max_length=100, serialize=False, verbose_name='uuid')),
                ('date', models.DateTimeField(verbose_name='Дата створення')),
                ('status', models.IntegerField(choices=[(0, 'Не оформленно'), (1, 'Оформленно'), (2, 'Підтверджено'), (3, 'Доставляється'), (4, 'Виконано'), (5, 'Спам')], default=0, verbose_name='Статус замовлення')),
                ('total', models.FloatField(blank=True, null=True, verbose_name='Ціна')),
            ],
            options={
                'verbose_name': 'замовлення',
                'verbose_name_plural': 'Замовлення',
            },
        ),
        migrations.CreateModel(
            name='Promo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=20, null=True, verbose_name='Промокод')),
                ('value', models.IntegerField(null=True, verbose_name='%')),
                ('date', models.DateTimeField(verbose_name='Дата створення')),
                ('end', models.DateTimeField(verbose_name='Активний до')),
                ('infinite', models.BooleanField(verbose_name='Багаторазовий')),
                ('used', models.BooleanField(verbose_name='Використаний')),
            ],
            options={
                'verbose_name': 'промокод',
                'verbose_name_plural': 'Промокоди',
            },
        ),
        migrations.CreateModel(
            name='Shop',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, verbose_name='Назва магазину')),
                ('availability', models.BooleanField(default=0, verbose_name='Доступність')),
            ],
            options={
                'verbose_name': 'магазини',
                'verbose_name_plural': 'Магазини',
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, verbose_name='Назва продукту')),
                ('description', ckeditor.fields.RichTextField(verbose_name='Опис продукту')),
                ('picture', models.ImageField(upload_to='', verbose_name='Картинка продукту')),
                ('price', models.FloatField(verbose_name='Ціна')),
                ('discount', models.FloatField(blank=True, null=True, verbose_name='Стара ціна')),
                ('ribbon', models.IntegerField(choices=[(0, 'Відсутня'), (1, 'Знижка'), (2, 'Хіт продажів'), (3, 'Новий')], default=0, verbose_name='Стрічка')),
                ('availability', models.BooleanField(default=0, verbose_name='Доступність')),
                ('shop', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='delivery.shop', verbose_name='Магазин')),
            ],
            options={
                'verbose_name': 'продукт',
                'verbose_name_plural': 'Продукти',
            },
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(default=0, null=True)),
                ('order', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='delivery.order')),
                ('product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='delivery.product')),
            ],
        ),
        migrations.CreateModel(
            name='Delivery',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, null=True, verbose_name="Ім'я")),
                ('phone', models.CharField(max_length=25, null=True, verbose_name='Мобільний телефон')),
                ('city', models.CharField(max_length=50, null=True, verbose_name='Місто')),
                ('street', models.CharField(max_length=50, null=True, verbose_name='Вулиця')),
                ('house', models.CharField(max_length=50, null=True, verbose_name='Будинок')),
                ('apartment', models.CharField(max_length=50, null=True, verbose_name='Квартира')),
                ('entrance', models.CharField(max_length=50, null=True, verbose_name="Під'їзд")),
                ('code', models.CharField(max_length=50, null=True, verbose_name='Код')),
                ('floor', models.CharField(max_length=50, null=True, verbose_name='Поверх')),
                ('promo', models.CharField(max_length=25, null=True, verbose_name='Промокод')),
                ('comment', models.TextField(null=True, verbose_name='Коментар')),
                ('call', models.BooleanField(choices=[(0, 'Ні'), (1, 'Так')], default=0, verbose_name='Телефонувати')),
                ('order', models.ForeignKey(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, to='delivery.order', verbose_name='Номер замовлення')),
            ],
        ),
    ]
