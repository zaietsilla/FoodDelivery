from django.contrib import admin

from .models import Shop, Product, Order, OrderItem, Delivery, Promo


class Items(admin.TabularInline):
    model = OrderItem
    readonly_fields = ["product", "quantity"]
    extra = 0

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


class Client(admin.StackedInline):
    model = Delivery
    readonly_fields = ["name", "phone", "city", "street", "house", "apartment",
                       "entrance", "code", "floor", "promo", "comment", "call", "order_id", "order"]
    extra = 0

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


class AdminShop(admin.ModelAdmin):
    list_display = ("id", "name", "availability")
    search_fields = ["name"]
    list_display_links = ["name"]


class AdminProduct(admin.ModelAdmin):
    list_display = ("id", "shop", "title", "price", "discount", "ribbon", "availability")
    search_fields = ["title"]
    list_display_links = ["title"]


class AdminOrder(admin.ModelAdmin):
    list_display = ("id", "date", "status", "total", "uuid")
    readonly_fields = ["total", "date"]
    list_display_links = ["status"]
    list_filter = ["status"]
    inlines = [Items, Client]


class AdminPromo(admin.ModelAdmin):
    list_display = ("code", "value", "date", "end", "infinite", "used")


admin.site.register(Shop, AdminShop)
admin.site.register(Product, AdminProduct)
admin.site.register(Order, AdminOrder)
admin.site.register(Promo, AdminPromo)