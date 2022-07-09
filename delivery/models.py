from django.db import models
from ckeditor.fields import RichTextField


class Shop(models.Model):
    name = models.CharField("Назва магазину", max_length=100)
    availability = models.BooleanField("Доступність", default=0)

    class Meta:
        verbose_name = "магазини"
        verbose_name_plural = "Магазини"

    def __str__(self):
        return self.name


class Product(models.Model):

    ribbons = (
        (0, "Відсутня"),
        (1, "Знижка"),
        (2, "Хіт продажів"),
        (3, "Новий"),
    )

    shop = models.ForeignKey(Shop, on_delete=models.CASCADE, null=True, verbose_name="Магазин")
    title = models.CharField("Назва продукту", max_length=200)
    description = RichTextField("Опис продукту")
    picture = models.ImageField("Картинка продукту")
    price = models.FloatField("Ціна")
    discount = models.FloatField("Стара ціна", null=True, blank=True)
    ribbon = models.IntegerField("Стрічка", default=0, choices=ribbons)
    availability = models.BooleanField("Доступність", default=0)


    class Meta:
        verbose_name = "продукт"
        verbose_name_plural = "Продукти"

    def __str__(self):
        return self.title


class Order(models.Model):

    order_status = (
        (0, "Не оформленно"),
        (1, "Оформленно"),
        (2, "Підтверджено"),
        (3, "Доставляється"),
        (4, "Виконано"),
        (5, "Спам")
    )

    uuid = models.CharField(verbose_name='uuid', serialize=False, max_length=100, editable=False)
    date = models.DateTimeField("Дата створення")
    status = models.IntegerField("Статус замовлення", default=0, choices=order_status)
    total = models.FloatField("Ціна", null=True, blank=True)

    class Meta:
        verbose_name = "замовлення"
        verbose_name_plural = "Замовлення"

    def __str__(self):
        return self.uuid


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    quantity = models.IntegerField(default=0, null=True)

    order_title = "Назва товару"

    def __str__(self):
        return self.order_title


class Delivery(models.Model):


    make_call = (
        (0, "Ні"),
        (1, "Так")
    )

    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True, editable=False, verbose_name="Номер замовлення")

    name = models.CharField("Ім'я", max_length=50, null=True)
    phone = models.CharField("Мобільний телефон", max_length=25, null=True)
    city = models.CharField("Місто", max_length=50, null=True)
    street = models.CharField("Вулиця", max_length=50, null=True)
    house = models.CharField("Будинок", max_length=50, null=True)
    apartment = models.CharField("Квартира", max_length=50, null=True)
    entrance = models.CharField("Під'їзд", max_length=50, null=True)
    code = models.CharField("Код", max_length=50, null=True)
    floor = models.CharField("Поверх", max_length=50, null=True)
    promo = models.CharField("Промокод", max_length=25, null=True)
    comment = models.TextField("Коментар", null=True)
    call = models.BooleanField("Телефонувати", default=0, choices=make_call)


    shipping_title = "Дані доставки"

    def __str__(self):
        return self.shipping_title


class Promo(models.Model):
    code = models.CharField("Промокод", max_length=20, null=True)
    value = models.IntegerField("%", null=True)
    date = models.DateTimeField("Дата створення")
    end = models.DateTimeField("Активний до")
    infinite = models.BooleanField("Багаторазовий")
    used = models.BooleanField("Використаний")

    class Meta:
        verbose_name = "промокод"
        verbose_name_plural = "Промокоди"

    def __str__(self):
        return self.code