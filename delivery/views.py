import json

from django.http import JsonResponse
from django.shortcuts import render

from .logic import get_shops_and_products, get_product_info, save_order_items, get_checkout_products, order_data_validation, check_promo_and_return_discount_value


def index(request):
    context = get_shops_and_products()
    return render(request, "delivery/index.html", context)


def product(request, id):
    context = get_product_info(id)
    return render(request, "delivery/product.html", context)


def cart(request):

    json_str = request.body.decode('utf-8')
    json_obj = json.loads(json_str)

    uuid = save_order_items(json_obj)

    return JsonResponse(uuid, safe=False)


def checkout(request, uuid):
    context = get_checkout_products(uuid)
    return render(request, "delivery/checkout.html", context)


def create_order(request):
    data = request.POST
    result = order_data_validation(data)
    return JsonResponse(result, safe=False)
        

def promo(request):
    code = request.GET["code"]
    data = check_promo_and_return_discount_value(code)
    return JsonResponse(data)


def info(request):
    return render(request, "delivery/info.html")