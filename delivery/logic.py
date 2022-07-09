import time

from uuid import uuid4
from datetime import datetime

from django.shortcuts import redirect
from .models import Shop, Product, Order, OrderItem, Delivery, Promo


def get_shops_and_products():

    shops = Shop.objects.all().filter(availability=1)
    products = Product.objects.all().filter(availability=1)

    return {"shops": shops, "products": products}


def get_product_info(id):

    item = Product.objects.get(id=id)
    shop = Shop.objects.get(id=item.shop.id)

    return {"item": item, "shop": shop}


def save_order_items(json_obj):

    unique = uuid4()

    o = Order()
    o.uuid = unique
    o.date = datetime.now()
    o.status = 0
    o.save()

    for i in range(len(json_obj)):
        oi = OrderItem()
        oi.order_id = o.id
        oi.product_id = json_obj[i]["id"]
        oi.quantity = json_obj[i]["quantity"]
        oi.save()

    return(unique)


def get_checkout_products(uuid):

    o = Order.objects.get(uuid=uuid)
    order_items = OrderItem.objects.filter(order_id=o.id)

    if o.status != 0:
        return redirect("/")

    items = []
    total = 0

    for i in order_items:

        item = []
        quantity = i.quantity

        p = Product.objects.get(id=i.product_id)

        title = p.title
        item.append(title)

        picture = p.picture
        item.append(picture)

        price = p.price
        item.append(price)

        item.append(quantity)

        cost = price * quantity
        item.append(cost)

        total = total + (price * quantity)
        items.append(item)

    context = {
        "order_items": order_items,
        "items": items,
        "total": total,
        "order_id": o.id,
        "uuid": uuid,
    }

    t = Order.objects.get(id=o.id)
    t.total = total
    t.save()

    return context


def order_data_validation(data):

    uuid = data.get("uuid", None)
    name = data.get("name", None)
    phone = data.get("phone", None)
    city = data.get("city", None)
    street = data.get("street", None)
    house = data.get("house", None)
    apartment = data.get("apartment", None)
    entrance = data.get("entrance", None)
    code = data.get("code", None)
    floor = data.get("floor", None)
    promo = data.get("promo", None)
    comment = data.get("comment", None)
    flag = data.get("flag", None)

    result = None

    if all((uuid, name, phone, city, street, house)):

        if flag == 'on':
            flag = False
        else:
            flag = True

        o = Order.objects.get(uuid=uuid)

        if o.status == 0:

            Delivery.objects.create(
                name = name,
                phone = phone,
                city = city,
                street = street,
                house = house,
                apartment = apartment,
                entrance = entrance,
                code = code,
                floor = floor,
                promo = promo,
                comment = comment,
                call = flag,

                order_id=o.id
                )

            if Promo.objects.filter(code=promo).exists():
                p = Promo.objects.get(code=promo)

                if _days_between(p.end.strftime("%Y-%m-%d %H:%M:%S")) > 0 and p.used == 0:
                    if p.infinite == 1:
                        o.total = round((o.total / 100) * (100 - p.value))
                    elif p.infinite == 0:
                        o.total = round((o.total / 100) * (100 - p.value))
                        p.used = 1
                else:
                    p.used = 1
                p.save()

            o.status = 1
            o.save()
            
            result = ({"result": "success"})
        else:
            result = ({"result": "failure"})

    return result


def _days_between(d1):
    d1 = datetime.strptime(d1, "%Y-%m-%d %H:%M:%S")
    d2 = datetime.now()
    return abs((d2 - d1).days)


def check_promo_and_return_discount_value(code):

    data = {"discount": "None"}

    if Promo.objects.filter(code=code).exists():
        p = Promo.objects.get(code=code)

        if _days_between(p.end.strftime("%Y-%m-%d %H:%M:%S")) > 0 and p.used == 0:
            if p.infinite == 1:
                data = {"discount": p.value}
            elif p.infinite == 0:
                data = {"discount": p.value}

    return data


def _days_between(d1):
    d1 = datetime.strptime(d1, "%Y-%m-%d %H:%M:%S")
    d1_unixtime = time.mktime(d1.timetuple())
    d2_unixtime = time.mktime(datetime.now().timetuple())
    return int(d1_unixtime - d2_unixtime)