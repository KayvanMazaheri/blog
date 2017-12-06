---
title: کد‌های سیبیل دار
date: 2017-12-06 10:58:29
tags:
  - برنامه نویسی
  - معرفی
---
## قضیه چیه؟
خیلی وقت‌ها توی برنامه‌ای که می‌نویسیم نیاز داریم یک رشته (String) رو، با استفاده از داده‌هایی که الان توی برنامه داریم، بسازیم و برگردونیم، یا حتی فقط چاپشون کنیم.  
<!-- more -->
مثلا توی سایت جدیدتون، می‌خواید بعد از ورود به کاربرتون خوش‌آمد بگید، جوری که مثلا اگه کاربر اسمش **کیوان** بود بهش بگه **سلام،کیوان**.  
نکته مهم اینه که این رشته قراره با اطلاعات اون لحظه‌ی برنامه ساخته بشه (که مثلا توی یه متغیر ذخیره شدن).  

## حالت عادی چی‌کار می‌کردیم خب؟
مثلا توی <span dir="ltr">`C++`</span> یه همچین حرکتی می‌کردیم:
```cpp
string msg = "سلام، " + user.name;
cout << msg << endl;
```
 توی زبان‌های دیگه هم یه همچین کدی رو راحت می‌شه نوشت و خودتون بهتر از من بلدید.

## این خوب نیست یعنی؟
نه، اصلا !  
فرض کنید پیامی که قراره چاپ کنیم، به این سادگی نسیت، مثلا قراره بعد از خریدی که کاربر از ساییتون می‌کنه، بهش یک صفحه‌ی فاکتور نشون بدید که توش اسم اقلام خریداری شده، تعدادشون، قیمتشون، جمع قیمت، تخفیف، نام خریدار و هزار تا چیز دیگه رو نشون بدید.  
مشخصه که یه بخش هایی از این صفحه‌ی فاکتور همیشه ثابته، میتونیم بگیم که صفحه‌ی فاکتور یک قالب خاص داره که توش داده‌های مشتری فعلیتون رو قرار می‌دید و بعد صفحه رو بهش نشون می‌دید.  

> خیلی وقت‌ها، داده‌هایی که به کاربران نشان می‌دهیم از یک قالب مشخص پیروی می‌کنند.

واضحه که ساختن این صفحه‌ی فاکتور با استفاده از استراتژی قبلی خیلی راحت نیست. به علاوه‌ی این که کدی که به دست میاد خیلی خوانا نیست و در آینده هم برای تفییرش به احتمال زیاد به مشکل بر‌می‌خوریم.  
```cpp
// Dear Kayvan, you should pay 31$ for buying these 2 items.
msg = "Dear " + user.name + ", you should pay "
    + cart.totalPrice + "$ for buying these " + cart.itemCount + " items.";
```

## یه ذره بهترش کنیم
برای کار رفع این مشکلات، همیشه ابزار‌هایی ساخته شده‌اند که کار با قالب‌ها رو برای توسعه‌دهنده‌ها راحت کنند. حتی خیلی جاها توی خود زبان‌های برنامه نویسی یه کارایی کردند برای این منظور:

{% codeblock C++ &nbsp; lang:cpp http://www.cplusplus.com/reference/cstdio/printf/ [Printf] %}
printf("Dear %s, you should pay %s$ for buying these %d items.",
       user.name, cart.totalPrice, cart.itemCount);
{% endcodeblock %}

{% codeblock JavaScript (ES6) &nbsp; lang:javascript https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals [Template Literals] %}
console.log(`Dear ${ user.name }, you should pay ${ cart.totalPrice }$ for buying ${cart.itemCount} items.`)
{% endcodeblock %}

## Template Systems & Engines

 نیاز‌های توسعه‌دهنده‌ها معمولا بیشتر از این‌هاست و برای همین Template System ها به وجود اومدند. از Template System های معروف و محبوب میشه به اینا اشاره کرد:  
+ Handlebars
+ Mustache
+ Dust (توسط LinkedIn)
+ Nunchuks
+ Pug (که قبلا اسمش Jade بود)

کاری که این سیستم‌ها میکنن به صورت خلاصه اینه که شما با یه فرمت مشخص، یه قالب براشون تعریف می‌کنید و بعد هربار که نیاز داشتید، اطلاعاتتون رو به قالب تزریق می‌کنید، همه چیز خیلی راحت دقیقا همون جایی قرار می‌گیره که شما تعریف کردید.
این فالب‌ها معمولا خوانا هستند و به کد شما پیچیدگی اضافه نمی‌کنن.
معمولا از کد‌های Logic برنامه جدا هستن.
تغییرشون در آینده هم کار آسونیه.

{% asset_img mustache.png کد‌های سیبیل دار %}

## سیبیل‌ها در کد
### Mustache
یکی از سر‌راست ترین و راحت ترین Templating System هاییه که تا حالا دیدم.
کافیه قالبتون رو هرجور که نیاز دارید طراحی کنید، هر جاییش که قراره از مقدار یک متغیر استفاده کنید، می‌تونید از `{% raw %}{{ }}{% endraw %}` استفاده کنید.
مثلا:


```handlebars Mustache
Dear {{ user.name }}, you should pay {{ cart.totalPrice }}$ for buying these {{ cart.itemCount }} items.
```

 حتی خیلی راحت می‌تونید یه فاکتور `HTML` درست کنید:

```handlebars Mustache Template for Invoice Page
<div class="invoice">
  <p>Invoice for {{ user.name }}</p>
  <ol>
    {{# cart.items }}
    <li>{{ name }} - {{ price }}</li>
    {{/ cart.items }}
  </ol>
  <button> Pay {{ cart.totalPrice }}$ </button>
</div>
```

همونطور که توی کد بالا می‌بینید، می‌تونید با استفاده از همین سیبیل‌ها، خیلی راحت حلقه داشته باشید و به ازای تک تک اقلام خریداری شده، یک سطر شامل نام و قیمتش رو توی فاکتور چاپ کنید.

اگه برای مثال من قالب بالا رو با اطلاعات سبد خرید کاربری با نام **کیوان** پر کنم، نتیجش میشه این:
```json اطلاعات سبد خرید کیوان
{
  user: { name: "Kayvan" },
  cart: {
    items: [{ name: "sabzi", price: 200 }, { name: "goje", price: 125 }],
    itemCount: 2,
    totalPrice : 325
  }
}
```

```html خروجی HTML
<div class="invoice">
  <p>Invoice for Kayvan</p>
  <ol>
    <li>sabzi - 200</li>
    <li>goje - 125</li>
  </ol>
  <button> Pay 325$ </button>
</div>
```


توی مستنداتش می‌تونید بیشتر دربارش یاد بگیرید، برای خیلی از زبان‌ها هم کتابخونه داره و استفاده ازش خیلی راحته:
{% link صفحه اصلی وبسایت Mustache https://mustache.github.io وبسایت Mustache %}
{% link مستندات https://mustache.github.io/mustache.5.html مستندات Mustache %}


### Handlebars
 اینم هست، خیلی شبیه به Mustache ـه در ظاهر، ولی یه تفاوتایی داره
 مهم‌ترینش شاید اینه که برخلاف Mustache، هدفش این نیست که Logic-less باشه، برای همین مثلا یه سازوکار‌هایی برای چک کردن شرط داره.  

{% link صفحه اصلی وبسایت Handlebars http://handlebarsjs.com وبسایت Handlebars %}

### لینک‌ها
+ اینجا می‌تونید به صورت آنلاین کار با Handlebars و Mustache رو {% link آزمایش کنید http://tryhandlebarsjs.com Handlebars Sandbox %}.
+ یک راهنمای ساده برای {% link انتخاب Template Engine http://garann.github.io/template-chooser/ Template-Engine-Chooser %} ( _آپدیت نمیشه_ )
+ {% link صفحه اصلی وبسایت Mustache https://mustache.github.io وبسایت Mustache %}
+ {% link صفحه اصلی وبسایت Handlebars http://handlebarsjs.com وبسایت Handlebars %}



{% asset_img cool-mustache.gif وقتی یاد می‌گیری از Mustache استفاده کنی %}
