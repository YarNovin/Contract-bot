import { Snake } from "tgsnake";
import Pdf from "pdfkit";
import fs from "fs";
import moment from "jalali-moment";
//@ts-ignore
import { robot } from "@tgsnake/step";
const p2a = (s: string) =>
  //@ts-ignore
  s.replace(/[۰-۹]/g, (d) => {
    return "۰۱۲۳۴۵۶۷۸۹".indexOf(d) == -1 ? d : "0123456789".indexOf(d);
  });
let i = 1000;
class PDF {
  private data: any;
  private pageNumber: number = 0;
  constructor(public id: String) {
    this.data = { programmer: {}, employer: {}, project: {} };
  }

  setProgrammer(key: string, value: string) {
    this.data.programmer[key] = value;
  }
  setEmployer(key: string, value: string) {
    this.data.employer[key] = value;
  }
  setProject(key: string, value: string) {
    this.data.project[key] = value;
  }
  end() {
    let pdf = new Pdf({ size: [1000, 1300], autoFirstPage: false });
    let loc = `./${Date.now()}.pdf`;
    pdf.pipe(fs.createWriteStream(loc));

    let time = toFarsiNumber(
      moment(new Date(), "YYYY/MM/DD").locale("fa").format("YYYY/MM/DD")
    )
      .split("")
      .reverse()
      .join("");

    pdf.on("pageAdded", () => {
      this.pageNumber++;
      let height = pdf.page.height;
      let width = pdf.page.width;
      let bottom = pdf.page.margins.bottom;
      pdf.page.margins.bottom = 0;
      pdf.image("./style/yarnovin2.png", width / 2 - 500, height - 1000, {
        align: "center",
        valign: "center",
        fit: [height / 1.3, width / 1.3],
      });

      pdf.font(font).fontSize(15);
      pdf.path(`M50 ${height - 80} l0 0 900 0`).stroke();
      pdf.text(`مجموعه یارنوین`, 80, height - 60, {
        features: ["rtla"],
        align: "center",
      });
      pdf.text(`صفحه  ${this.pageNumber}`, 100, height - 60, {
        features: ["rtla"],
        align: "right",
      });
      pdf.image("./style/yarnovin.png", 50, height - 70, {
        fit: [50, 50],
      });
      pdf.page.margins.bottom = bottom;
    });

    pdf.addPage();

    pdf.font(font).fontSize(25);

    pdf.text("بسم الله الرحمن الرحیم", 100, 50, {
      features: ["rtla"],
      align: "center",
    });

    pdf.image("./style/yarnovin.png", 50, 25, {
      fit: [100, 100],
    });
    i++;
    pdf.text(time, 810, 40, { features: ["rtla"] });
    pdf.fontSize(18);
    pdf.text(
      `کد پیگیری ${toFarsiNumber(i.toString()).split("").reverse().join("")}`,
      805,
      80,
      { features: ["rtla"] }
    );
    pdf.path("M50 125 l0 0 900 0").stroke();

    pdf.text("قرارداد همکاری", 50, 150, {
      features: ["rtla"],
      align: "right",
    });

    pdf.text(
      "این قرارداد فی مابين اشخاص زیر طبق شرایط مندرج در آن منعقد میگردد:",
      50,
      200,
      { features: ["rtla"], align: "right" }
    );
    pdf.fontSize(15);

    pdf.opacity(0.7).circle(950, 260, 5).fillAndStroke("black");
    pdf.opacity(1);
    pdf.text(
      `آقا / خانم ${this.data.programmer.name} به کد ملی ${this.data.programmer.nationalId} و شماره شناسنامه ${this.data.programmer.nationalCode} با تلفن ${this.data.programmer.telephone} و تلفن همراه ${this.data.programmer.mobile}  به عنوان کارفرما
`,
      50,
      250,
      {
        features: ["rtla"],
        align: "right",
      }
    );

    pdf.opacity(0.7).circle(950, 290, 5).fillAndStroke("black");
    pdf.opacity(1);
    pdf.text(
      `آقا / خانم ${this.data.employer.name} به کد ملی ${this.data.employer.nationalId} و شماره شناسنامه ${this.data.employer.nationalCode} با تلفن ${this.data.employer.telephone} و تلفن همراه ${this.data.employer.mobile}  به عنوان توسعه‌دهنده
`,
      50,
      280,
      {
        features: ["rtla"],
        align: "right",
      }
    );
    pdf.fontSize(18);

    pdf.text("از آنجایی که :", 50, 320, {
      features: ["rtla"],
      align: "right",
    });

    pdf.fontSize(15);

    pdf.opacity(0.7).circle(950, 380, 5).fillAndStroke("black");
    pdf.opacity(1);
    pdf.text(
      `کارفرما تصمیم به ایجاد و یا بهبود ${this.data.project.plat1} در حوزه ${this.data.project.plat2} و در پلتفرم ${this.data.project.plat3} کرده است
  `,
      0,
      370,
      { features: ["rtla"], align: "right" }
    );

    pdf.opacity(0.7).circle(950, 410, 5).fillAndStroke("black");
    pdf.opacity(1);
    pdf.text(
      `طرفین معتقد هستند که تمامی اطلاعات رد و بدل شده توسط طرفین جنبه محرمانه داشته`,
      0,
      400,
      { features: ["rtla"], align: "right" }
    );

    pdf.opacity(0.7).circle(950, 440, 5).fillAndStroke("black");
    pdf.opacity(1);
    pdf.text(
      `توسعه‌دهنده وظیفه پیاده سازی پروژه با توصیفات مندرج در موضوع این قرارداد را دارد.`,
      0,
      430,
      { features: ["rtla"], align: "right" }
    );

    pdf.fontSize(15);

    pdf.text(
      "بنابراین طرفین به منظور تبیین شرایط همکاری در این قرارداد، تعیین حقوق و تعهدات هر طرف نسبت به تنظیم این قرارداد به شرح ذیل موافقت نمودند:",
      50,
      470,
      { features: ["rtla"], align: "right" }
    );

    pdf.fontSize(18);

    pdf.text(`ماده اول - تعاریف :`, 0, 520, {
      features: ["rtla"],
      align: "right",
    });

    pdf.fontSize(15);

    pdf.opacity(0.7).circle(950, 580, 5).fillAndStroke("black");
    pdf.opacity(1);
    pdf.text(
      `توسعه‌دهنده: شخصی  یا تیمی است که طبق این قرارداد اقدام به پیاده سازی موضوع قرارداد می کند.`,
      0,
      570,
      { features: ["rtla"], align: "right" }
    );

    pdf.opacity(0.7).circle(950, 610, 5).fillAndStroke("black");
    pdf.opacity(1);
    pdf.text(
      `نرم افزارهای لازم: عبارت است از نرم افزارهایی که به عنوان توسعه‌دهنده در راستای انجام پروژه مورد استفاده قرار میدهد.`,
      0,
      600,
      { features: ["rtla"], align: "right" }
    );
    pdf.opacity(0.7).circle(950, 640, 5).fillAndStroke("black");
    pdf.opacity(1);
    pdf.text(
      `کارفرما: عبارت است از اشخاص اعم از حقیقی و حقوقی که پروژه را به توسعه‌دهنده واگذار میکند.
  `,
      0,
      630,
      { features: ["rtla"], align: "right" }
    );

    pdf.opacity(0.7).circle(950, 670, 5).fillAndStroke("black");
    pdf.opacity(1);
    pdf.text(`ماه شمسی: برابر است با ماه های سی روزه در تقویم شمسی.`, 0, 660, {
      features: ["rtla"],
      align: "right",
    });

    pdf.fontSize(18);

    pdf.text(`ماده دوم - موضوع قرارداد :`, 0, 710, {
      features: ["rtla"],
      align: "right",
    });

    pdf.fontSize(15);

    pdf.opacity(0.7).circle(950, 770, 5).fillAndStroke("black");
    pdf.opacity(1);
    pdf.text(
      ` همکاری با برنامه‌نویس در جهت انجام امور برنامه‌نویسی ${this.data.project.plat2} در پلتفرم ${this.data.project.plat3}`,
      0,
      760,
      { features: ["rtla"], align: "right" }
    );

    pdf.opacity(0.7).circle(950, 800, 5).fillAndStroke("black");
    pdf.opacity(1);
    pdf.text(
      `زبان های توسعه‌دهندهی مذکور که توسعه‌دهنده موظف به استفاده از آن‌هاست عبارتند از: هرگونه زبان و تکنولوژی که مورد نیاز برای توسعه هرچه بهتر نرم افزار است`,
      0,
      790,
      { features: ["rtla"], align: "right" }
    );

    pdf.opacity(0.7).circle(950, 830, 5).fillAndStroke("black");
    pdf.opacity(1);
    pdf.text(`مشخصات کلی پروژه به شرح ذیل است:`, 0, 820, {
      features: ["rtla"],
      align: "right",
    });

    pdf.opacity(0.7).lineJoin("miter").rect(945, 865, 10, 10).fill("black");
    pdf.opacity(1);
    pdf.text(`توضیحات :‌  ${this.data.project.description}`, 0, 860, {
      features: ["rtla"],
      align: "right",
    });

    pdf.opacity(0.7).lineJoin("miter").rect(945, 905, 10, 10).fill("black");
    pdf.opacity(1);
    pdf.text(`قابلیت ها:  ${this.data.project.feature}`, 0, 900, {
      features: ["rtla"],
      align: "right",
    });

    pdf.opacity(0.7).lineJoin("miter").rect(945, 945, 10, 10).fill("black");
    pdf.opacity(1);

    pdf.text(`صفحات :‌ ${this.data.project.pages}`, 0, 940, {
      features: ["rtla"],
      align: "right",
    });

    pdf.fontSize(18);

    pdf.text(`ماده سوم - مدت قرارداد :`, 0, 990, {
      features: ["rtla"],
      align: "right",
    });

    pdf.fontSize(15);

    pdf.opacity(0.7).circle(950, 1040, 5).fillAndStroke("black");
    pdf.opacity(1);
    pdf.text(`مدت این قرارداد ${this.data.project.time} شمسی است.`, 0, 1030, {
      features: ["rtla"],
      align: "right",
    });

    pdf.opacity(0.7).circle(950, 1070, 5).fillAndStroke("black");
    pdf.opacity(1);

    pdf.text(`تاریخ شروع این قرارداد ${time} خواهد بود.`, 0, 1060, {
      features: ["rtla"],
      align: "right",
    });

    pdf.opacity(0.7).circle(950, 1100, 5).fillAndStroke("black");
    pdf.opacity(1);

    pdf.text(
      `شروع زمان بندى اجراى قرارداد منوط به پرداخت پيش پرداخت از سوى كارفرما به توسعه‌دهنده و نيز تحويل اطلاعات و مدارك مورد نياز جهت اجراى موضوع قرارداد می‌باشد.
`,
      0,
      1090,
      {
        features: ["rtla"],
        align: "right",
      }
    );

    pdf.opacity(0.7).circle(950, 1130, 5).fillAndStroke("black");
    pdf.opacity(1);

    pdf.text(
      `بدیهی است که در صورت توافق طرفین با یکدیگر امکان تمدید این مدت زمان های مندرج وجود دارد.`,
      0,
      1120,
      {
        features: ["rtla"],
        align: "right",
      }
    );

    pdf.addPage();
    pdf.fontSize(18);

    pdf.text(`ماده چهارم - مبلغ قرارداد :`, 0, 50, {
      features: ["rtla"],
      align: "right",
    });

    pdf.fontSize(15);

    pdf.opacity(0.7).circle(950, 110, 5).fillAndStroke("black");
    pdf.opacity(1);

    pdf.text(
      `مبلغ قرارداد با شرایط مذکور در ماده دو و سه، ${toFarsiNumber(
        Number(this.data.project.pay).toLocaleString()
      )
        .split("")
        .reverse()
        .join("")} تومان خواهد بود که در سه موعد زیر به توسعه‌دهنده پرداخت می‌شود:`,
      0,
      100,
      {
        features: ["rtla"],
        align: "right",
      }
    );

    pdf.opacity(0.7).lineJoin("miter").rect(945, 145, 10, 10).fill("black");
    pdf.opacity(1);
    pdf.text(
      `مقدار ۵۲ درصد از مبلغ قرارداد معادل ${toFarsiNumber(
        (this.data.project.pay / 4).toLocaleString()
      )
        .split("")
        .reverse()
        .join("")} تومان در زمان انعقاد قرارداد`,
      0,
      140,
      {
        features: ["rtla"],
        align: "right",
      }
    );
    pdf.opacity(0.7).lineJoin("miter").rect(945, 175, 10, 10).fill("black");
    pdf.opacity(1);
    pdf.text(
      `مقدار ۵۲ درصد از مبلغ قرارداد معادل ${toFarsiNumber(
        (this.data.project.pay / 4).toLocaleString()
      )
        .split("")
        .reverse()
        .join("")} تومان در زمان ارائه اولین پیش نمایش از پروژه`,
      0,
      170,
      {
        features: ["rtla"],
        align: "right",
      }
    );
    pdf.opacity(0.7).lineJoin("miter").rect(945, 205, 10, 10).fill("black");
    pdf.opacity(1);
    pdf.text(
      `مقدار ۰۵ درصد از مبلغ قرارداد معادل ${toFarsiNumber(
        (this.data.project.pay / 2).toLocaleString()
      )
        .split("")
        .reverse()
        .join("")} تومان در زمان ارائه آخرین پیش نمایش از پروژه`,
      0,
      200,
      {
        features: ["rtla"],
        align: "right",
      }
    );

    pdf.fontSize(18);

    pdf.text(`ماده پنجم - تعهدات توسعه‌دهنده :`, 0, 255, {
      features: ["rtla"],
      align: "right",
    });
    pdf.fontSize(15);

    pdf.opacity(0.7).circle(950, 315, 5).fillAndStroke("black");
    pdf.opacity(1);

    pdf.text(
      `توسعه‌دهنده متعهد میگردد در صورت دریافت کلیه داده‌ها و موارد مورد نیاز در پروژه ، موضوع قرارداد را در مدت زمان ذکر شده در بند مدت قرارداد به کارفرما تحویل نماید.\n بديهی است که توسعه‌دهنده هیچ دخل و تصرف و تعهدی در محتوی و مطالب داخل پروژه ندارد و صرفا پیاده سازی پروژه بر عهده توسعه‌دهنده است.`,
      0,
      305,
      {
        features: ["rtla"],
        align: "right",
      }
    );

    pdf.opacity(0.7).circle(950, 375, 5).fillAndStroke("black");
    pdf.opacity(1);

    pdf.text(
      `تغییر در ساختار پروژه و اضافه شدن ویژگی های جدید نیازمند توافق مجدد و قرارداد متمم خواهد بود.`,
      0,
      365,
      {
        features: ["rtla"],
        align: "right",
      }
    );

    pdf.opacity(0.7).circle(950, 405, 5).fillAndStroke("black");
    pdf.opacity(1);

    pdf.text(
      `با توجه به وظیفه تخصصی توسعه‌دهنده در تولید این پروژه انجام هر کاری خارج از محدوده ی مورد توافق در اين قرارداد، در تعهد توسعه دهنه نیست و با توافق ثانويه مشمول هزينه خواهد بود.`,
      0,
      395,
      {
        features: ["rtla"],
        align: "right",
      }
    );
    pdf.opacity(0.7).circle(950, 465, 5).fillAndStroke("black");
    pdf.opacity(1);

    pdf.text(
      `پشتیبانی از پروژه تولید شده به مدت ${this.data.project.timeSupport} از تاریخ انتشار بر عهده توسعه‌دهنده خواهد بود که شامل و محدود به موارد فنی است.`,
      0,
      455,
      {
        features: ["rtla"],
        align: "right",
      }
    );

    pdf.opacity(0.7).circle(950, 495, 5).fillAndStroke("black");
    pdf.opacity(1);

    pdf.text(
      `در صورت تمایل برای پشتیبانی پس از مدت مذکور معادل ۵۲ درصد از مبلغ قرارداد به عنوان حق الزحمه جهت هر دو ماه پشتیبانی مازاد به توسعه‌دهنده تعلق می‌گیرد.
  `,
      0,
      485,
      {
        features: ["rtla"],
        align: "right",
      }
    );

    pdf.opacity(0.7).circle(950, 525, 5).fillAndStroke("black");
    pdf.opacity(1);

    pdf.text(
      `در ازای هر هفته تاخیر در مراحل تحویل توسط توسعه دهنه، مقدار ۵ درصد از مبلغ کل قرارداد کاسته می‌شود.
  `,
      0,
      515,
      {
        features: ["rtla"],
        align: "right",
      }
    );

    pdf.opacity(0.7).circle(950, 555, 5).fillAndStroke("black");
    pdf.opacity(1);

    pdf.text(
      `توسعه‌دهنده مسئول حفظ محرمانگی تمامی اسناد و مدارک منتقل شده به خود توسط کارفرماست. محرمانگی این اطلاعات تا همیشه پس از انعقاد قرارداد باقی است\n و با فوت یا حجر توسعه‌دهنده، این مورد باید در ارتباط با وراث و یا نمایندگان او نیز رعایت شود.
  `,
      0,
      545,
      {
        features: ["rtla"],
        align: "right",
      }
    );

    pdf.fontSize(18);

    pdf.text(`ماده ششم - تعهدات کارفرما :`, 0, 615, {
      features: ["rtla"],
      align: "right",
    });
    pdf.fontSize(15);

    pdf.opacity(0.7).circle(950, 675, 5).fillAndStroke("black");
    pdf.opacity(1);

    pdf.text(
      `کارفرما متعهد میگردد کلیه اطلاعات مورد نیاز پروژه را در اختیار توسعه‌دهنده قرار دهد. بدیهی است در صورت عدم تحویل اطلاعات مورد نیاز، توسعه‌دهنده هیچگونه مسئولیتی \nدر خصوص تحویل به موقع موضوع قرارداد در مدت زمان ذکر شده را بر عهده نخواهد داشت. این اطلاعات به شرح ذیل است:`,
      0,
      665,
      {
        features: ["rtla"],
        align: "right",
      }
    );

    pdf.opacity(0.7).lineJoin("miter").rect(945, 730, 10, 10).fill("black");
    pdf.opacity(1);

    pdf.text(`اطلاعات کلی پروژه`, 0, 725, {
      features: ["rtla"],
      align: "right",
    });
    pdf.opacity(0.7).lineJoin("miter").rect(945, 760, 10, 10).fill("black");
    pdf.opacity(1);

    pdf.text(`اطلاعات در خصوص هویت بصری پروژه به صورت تمام و کمال`, 0, 755, {
      features: ["rtla"],
      align: "right",
    });
    pdf.opacity(0.7).lineJoin("miter").rect(945, 790, 10, 10).fill("black");
    pdf.opacity(1);

    pdf.text(`اطلاعات در خصوص قابلیت ها به صورت تمام و کمال`, 0, 785, {
      features: ["rtla"],
      align: "right",
    });
    pdf.opacity(0.7).lineJoin("miter").rect(945, 820, 10, 10).fill("black");
    pdf.opacity(1);

    pdf.text(`اطلاعات در خصوص بخش های مورد نیاز به صورت تمام و کمال`, 0, 815, {
      features: ["rtla"],
      align: "right",
    });

    pdf.opacity(0.7).circle(950, 870, 5).fillAndStroke("black");
    pdf.opacity(1);

    pdf.text(
      `پاسخگويی به اشخاص ثالث در مورد مالکیت محتوای ارائه شده و همچنین مطابق بودن آن با موازين جمهوری اسلامی ايران به عهده کارفرما می‌باشد.
  `,
      0,
      860,
      {
        features: ["rtla"],
        align: "right",
      }
    );
    pdf.opacity(0.7).circle(950, 900, 5).fillAndStroke("black");
    pdf.opacity(1);

    pdf.text(
      `کارفرما متعهد می‌گردد کلیه موارد ذکر شده در مبلغ قرارداد را به توسعه‌دهنده تحویل نماید.`,
      0,
      890,
      {
        features: ["rtla"],
        align: "right",
      }
    );

    pdf.opacity(0.7).circle(950, 930, 5).fillAndStroke("black");
    pdf.opacity(1);

    pdf.text(
      `پرداخت کلیه کسورات قانونی مبلغ قرارداد بر عهده کارفرما می‌باشد و مبلغ قرارداد به صورت خالص به توسعه‌دهنده پرداخت میگردد و کارفرما موظف به تحویل کلیه اسناد \nپرداختی به توسعه‌دهنده می باشد.`,
      0,
      920,
      {
        features: ["rtla"],
        align: "right",
      }
    );

    pdf.opacity(0.7).circle(950, 985, 5).fillAndStroke("black");
    pdf.opacity(1);

    pdf.text(
      `کارفرما موظف است در حفاظت از کلیه اطلاعات امنیتی پروژه که در اختیار وی قرار می‌گیرد کوشا باشد. در صورتی که نام کاربری و رمز عبور پروژه یا هرگونه اطلاعات\n خصوصی دیگری در اختیار افراد غیر قرارگیرد به هرنحوی مانند نرم‌افزار‌ها یا عدم رعایت نکات ایمنی و ... توسعه‌دهنده مسؤلیتی در این خصوص بر عهده نخواهد داشت.`,
      0,
      975,
      {
        features: ["rtla"],
        align: "right",
      }
    );

    pdf.opacity(0.7).circle(950, 1040, 5).fillAndStroke("black");
    pdf.opacity(1);

    pdf.text(
      `کارفرما موظف است رضایت خودرا مبنی بر قرارگرفتن امضای توسعه‌دهنده برای همیشه در پروژه نهایی اعلام کند. در غیر این صورت موظف است که با پرداخت مبلغ ۲ میلیون تومان به توسعه‌دهنده این مسئولیت را نادیده بگیرد.
  `,
      0,
      1030,
      {
        features: ["rtla"],
        align: "right",
      }
    );

    pdf.opacity(0.7).circle(950, 1090, 5).fillAndStroke("black");
    pdf.opacity(1);

    pdf.text(
      `در صورت استفاده توسعه‌دهنده از برنامه‌ها و ابزارهای غیر رایگان در پروژه مذکور، کارفرما موظف به پرداخت هزینه مذکور برای تهیه لایسنس و یا مجوز استفاده از آن است
  `,
      0,
      1080,
      {
        features: ["rtla"],
        align: "right",
      }
    );

    pdf.opacity(0.7).circle(950, 1120, 5).fillAndStroke("black");
    pdf.opacity(1);

    pdf.text(
      `در صورت تاخیر کارفرما برای در پرداخت در هر موعد حق الزحمه، مقدار ۸۱ درصد از مبلغ کل قرارداد به عنوان هزینه مازاد به حق الزحمه توسعه‌دهنده افزوده می‌شود.
  `,
      0,
      1110,
      {
        features: ["rtla"],
        align: "right",
      }
    );

    pdf.opacity(0.7).circle(950, 1150, 5).fillAndStroke("black");
    pdf.opacity(1);

    pdf.text(
      `. کارفرما موظف است نسبت به تهیه زیرساخت‌ها و سرورهای فنی موردنیاز پروژه اقدام کند. همچنین کارفرما میتواند با پرداخت هزینه به توسعه‌دهنده این مسئولیت را به ایشان بسپارد`,
      0,
      1140,
      {
        features: ["rtla"],
        align: "right",
      }
    );

    pdf.opacity(0.7).circle(950, 1195, 5).fillAndStroke("black");
    pdf.opacity(1);

    pdf.text(
      `توسعه‌دهنده تنها موظف به تبعیت از کارفرما و یا نماینده وی است.`,
      0,
      1185,
      {
        features: ["rtla"],
        align: "right",
      }
    );

    pdf.addPage();
    pdf.fontSize(18);

    pdf.text(`ماده هفتم - فورس ماژور:`, 0, 50, {
      features: ["rtla"],
      align: "right",
    });
    pdf.fontSize(15);

    pdf.opacity(0.7).circle(950, 110, 5).fillAndStroke("black");
    pdf.opacity(1);

    pdf.text(
      `چنانچه به دلیل فورس ماژور انجام تمام یا قسمتی از تعهدات و وظایف موضوع این قرارداد امکان‌پذیر نباشد، تا زمانی که شرایط مذکور ادامه دارد، عدم انجام تعهدات و وظایف موضوع این قرارداد، تخلف از مفاد آن محسوب نمی‌شود. مشروط بر اینکه اگر طرفین قادر به ایفای خود نباشند، حداکثر ظرف مدت ۰۱ روز مراتب را به طرف مقابل اعلام کنند.\n همچنین طرفین باید حداکثر تلاش خود را در جهت رفع وضعیت قوه قاهره اعمال کنند. چنانچه تا حداقل یکماه از تاریخ وقوع قوه قاهره انجام موضوع این قرارداد ممکن نباشد، طرفین می‌توانند در خصوص نحوه ادامه قرارداد با هم به توافق جدیدی برسند.
  `,
      0,
      100,
      {
        features: ["rtla"],
        align: "right",
      }
    );

    pdf.opacity(0.7).circle(950, 220, 5).fillAndStroke("black");
    pdf.opacity(1);

    pdf.text(
      `فورس ماژور به معنی عمل، واقعه یا سببی غیر قابل پیشگیری و خارج از کنترل معقول است که مانع انجام تعهدات می‌باشد و بدون قید محدودیت شامل بلایای طبیعی، وضیعت فوق العاده در کشور بواسطه جنگ و موارد مشابه آن،  قطع برق، اعتصاب، اقدام یا عدم اقدام دولت یا سایر مراجع ذیصلاح از جمله مصادره، محدودیت آزادی، ممنوعیت، مداخله، ضبط، الزام، دستور، یا تحریم به موجب وضع قانون، تغییر قانون و مقررات، حکم یا سایر دستورات لازم‌الاجرای حقوقی که بر اجرای قرارداد تأثیر مستقیم دارد، قطع شبکه و اینترنت\n و فیلتر شدن تا حدی که انجام موضوع قرارداد رامختل کند.
  `,
      0,
      210,
      {
        features: ["rtla"],
        align: "right",
      }
    );

    pdf.fontSize(18);

    pdf.text(`ماده هشتم - قانون حاکم و حل اختلاف:`, 0, 320, {
      features: ["rtla"],
      align: "right",
    });

    pdf.fontSize(15);

    pdf.opacity(0.7).circle(950, 380, 5).fillAndStroke("black");
    pdf.opacity(1);

    pdf.text(
      `این قرارداد تابع قوانین جمهوری اسلامی ایران است و مطابق با ماده ۰۱ قانون مدنی تنظیم شده است. کلیه اختلاف ناشی از اجرا، تفسیر، خاتمه و سایر موارد که در نتیجه این قرارداد فیمابین طرفین حاصل می‌شود ابتدا از طریق مذاکرات دوستانه حل و فصل خواهد شد. در صورت عدم رفع اختلاف  ظرف ۰۱ روز از آغاز مذاکرات هر یک از طرفین می‌توانند به مراجع صالح قضایی مراجعه کنند.
  `,
      0,
      370,
      {
        features: ["rtla"],
        align: "right",
      }
    );

    pdf.fontSize(18);

    pdf.text(`ماده نهم - قطع همکاری:`, 0, 450, {
      features: ["rtla"],
      align: "right",
    });

    pdf.fontSize(15);

    pdf.opacity(0.7).circle(950, 500, 5).fillAndStroke("black");
    pdf.opacity(1);

    pdf.text(
      `توسعه‌دهنده موظف است در صورت تمایل به قطع همکاری، حداقل از یک هفته قبل مراتب را به کارفرما اطلاع دهد. همچنین، موظف است که تا روز اطلاع داده شده همکاری \nرا ادامه دهد
  `,
      0,
      490,
      {
        features: ["rtla"],
        align: "right",
      }
    );

    pdf.fontSize(18);

    pdf.text(`ماده دهم - شرایط کلی:`, 0, 550, {
      features: ["rtla"],
      align: "right",
    });

    pdf.fontSize(15);

    pdf.opacity(0.7).circle(950, 600, 5).fillAndStroke("black");
    pdf.opacity(1);

    pdf.text(
      `این قرارداد متضمن کلیه توافقات طرفین در خصوص موضوع اصلی آن بوده و توافقات و اظهارات پیشین، اعم از شفاهی و کتبی، در ارتباط با موضوع این قرارداد از تاریخ انعقاد، فاقد هرگونه اثر خواهد بود.`,
      0,
      590,
      {
        features: ["rtla"],
        align: "right",
      }
    );

    pdf.opacity(0.7).circle(950, 660, 5).fillAndStroke("black");
    pdf.opacity(1);

    pdf.text(
      `هر گونه تغییر و یا اصلاح قرارداد صرفا با توافق کتبی طرفین امکانپذیر است.`,
      0,
      650,
      {
        features: ["rtla"],
        align: "right",
      }
    );

    pdf.opacity(0.7).circle(950, 690, 5).fillAndStroke("black");
    pdf.opacity(1);

    pdf.text(
      `هیچ‌یک از طرفین قرارداد نمی‌توانند حقوق و تعهدات خود به موجب این قرارداد را بطور جزئی و یا کلی به اشخاص ثالث منتقل کنند مگر در صورت توافق با یکدیگر.`,
      0,
      680,
      {
        features: ["rtla"],
        align: "right",
      }
    );

    pdf.opacity(0.7).circle(950, 720, 5).fillAndStroke("black");
    pdf.opacity(1);

    pdf.text(
      `چنانچه هر یک از شروط، قیود، تعهدات یا سایر مقررات این قرارداد یا اعمال آن‌ها به هر میزان بی اعتبار، ممنوع یا غیر قابل اجرا باشد، در آن صورت مقرره مربوطه تا میزان این بی اعتباری، ممنوعیت یا عدم قابلیت اجرا، فاقد اثر است لیکن سایر مواد این قرارداد یا اعمال مقررات مربوطه همچنان به قوت و اعتبار خود باقی خواهد بود. 
  `,
      0,
      710,
      {
        features: ["rtla"],
        align: "right",
      }
    );

    pdf.opacity(0.7).circle(950, 770, 5).fillAndStroke("black");
    pdf.opacity(1);

    pdf.text(
      `این قرارداد در ده ماده که جزء لاینفک این قرارداد است در ۲ نسخه تنظیم شده است و با امضای طرفین معتبر خواهد گردید 
  `,
      0,
      760,
      {
        features: ["rtla"],
        align: "right",
      }
    );

    pdf.text(`امضای کارفرما`, 260, 822, {
      features: ["rtlm"],
    });

    pdf.opacity(0.7).lineJoin("miter").rect(150, 850, 300, 300).stroke("black");
    pdf.opacity(1);
    pdf.image(this.data.project.sign1, 160, 860, { width: 280, height: 280 });
    pdf.text(`امضای توسعه‌دهنده/نماینده مجموعه یارنوین`, 565, 822, {
      features: ["rtlm"],
    });
    pdf.opacity(0.7).lineJoin("miter").rect(550, 850, 300, 300).stroke("black");
    pdf.opacity(1);
    pdf.image(this.data.project.sign2, 560, 860, { width: 280, height: 280 });

    pdf.end();
    return loc;
  }
}

const bot = new Snake({
  apiId: 13511178,
  apiHash: "d69ef9e14d0de589016fcc12441da95e",
  botToken: `5334394126:AAEBUNjv1UYBGjHfQ4scPp10apqDVgBmXIA`,
  storeSession: false,
});

function toFarsiNumber(n: string) {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  //@ts-ignore
  return n.toString().replace(/\d/g, (x) => farsiDigits[x]);
}

const font = fs.readFileSync("./style/yekan.ttf");

let pdfs: Array<PDF> = [];
bot.on("message", async (ctx : any) => {
  if (ctx.text === "/stop") {
    robot.setStep("start");
  }
  robot.run(ctx).start("start1", () => {
    pdfs = pdfs.filter((x) => {
      return x.id == ctx.from.id.toString();
    });
    pdfs.push(new PDF(ctx.from.id.toString()));
    ctx.reply("اسم و فامیلی توسعه‌دهنده رو بفرست دا");
  });
  robot.step("start", () => {
    if (ctx.text !== "/start") {
      return;
    }
    pdfs = pdfs.filter((x) => {
      return x.id == ctx.from.id.toString();
    });
    pdfs.push(new PDF(ctx.from.id.toString()));
    ctx.reply("اسم و فامیلی توسعه‌دهنده رو بفرست دا").then(() => {
      robot.setStep("start1");
    });
  });
  robot.step("start1", () => {
    let pdf = pdfs.find((x) => {
      return x.id == ctx.from.id.toString();
    });

    if (pdf) {
      pdf.setProgrammer("name", ctx.text!);
      ctx.reply("کد ملی توسعه‌دهنده رو ارسال کن دابش").then(() => {
        robot.setStep("start2");
      });
    }
  });
  robot.step("start2", () => {
    let pdf = pdfs.find((x) => {
      return x.id == ctx.from.id.toString();
    });
    if (pdf) {
      pdf.setProgrammer(
        "nationalId",
        Number(p2a(ctx.text as any))
          ? toFarsiNumber(ctx.text?.split("").reverse().join("") as any)!
          : ctx.text!
      );
      ctx.reply("شماره شناسنامه توسعه‌دهنده رو بفرست عزیزم").then(() => {
        robot.setStep("start3");
      });
    }
  });
  robot.step("start3", () => {
    let pdf = pdfs.find((x) => {
      return x.id == ctx.from.id.toString();
    });
    if (pdf) {
      pdf.setProgrammer(
        "nationalCode",
        Number(p2a(ctx.text as any))
          ? toFarsiNumber(ctx.text?.split("").reverse().join("") as any)!
          : ctx.text!
      );
      ctx.reply("شماره تلفن توسعه‌دهنده رو بفرست عزیزم").then(() => {
        robot.setStep("start4");
      });
    }
  });
  robot.step("start4", () => {
    let pdf = pdfs.find((x) => {
      return x.id == ctx.from.id.toString();
    });
    if (pdf) {
      pdf.setProgrammer(
        "telephone",
        Number(p2a(ctx.text as any))
          ? toFarsiNumber(ctx.text?.split("").reverse().join("") as any)!
          : ctx.text!
      );
      ctx.reply("شماره موبایل توسعه‌دهنده رو بفرست قشنگم").then(() => {
        robot.setStep("start5");
      });
    }
  });
  robot.step("start5", () => {
    let pdf = pdfs.find((x) => {
      return x.id == ctx.from.id.toString();
    });
    if (pdf) {
      pdf.setProgrammer(
        "mobile",
        Number(p2a(ctx.text as any))
          ? toFarsiNumber(ctx.text?.split("").reverse().join("") as any)!
          : ctx.text!
      );
      ctx
        .reply("اوکی حله! حالا بریم سراغ کارفرما، اسم و فامیلش رو بفرست")
        .then(() => {
          robot.setStep("start6");
        });
    }
  });
  robot.step("start6", () => {
    let pdf = pdfs.find((x) => {
      return x.id == ctx.from.id.toString();
    });
    if (pdf) {
      pdf.setEmployer("name", ctx.text!);
      ctx.reply("حله، کد ملی کارفرما رو بفرست").then(() => {
        robot.setStep("start7");
      });
    }
  });
  robot.step("start7", () => {
    let pdf = pdfs.find((x) => {
      return x.id == ctx.from.id.toString();
    });
    if (pdf) {
      pdf.setEmployer(
        "nationalId",
        Number(p2a(ctx.text as any))
          ? toFarsiNumber(ctx.text?.split("").reverse().join("") as any)!
          : ctx.text!
      );
      ctx.reply("حله، شماره شناسنامه کارفرما رو بفرست").then(() => {
        robot.setStep("start8");
      });
    }
  });
  robot.step("start8", () => {
    let pdf = pdfs.find((x) => {
      return x.id == ctx.from.id.toString();
    });
    if (pdf) {
      pdf.setEmployer(
        "nationalCode",
        Number(p2a(ctx.text as any))
          ? toFarsiNumber(ctx.text?.split("").reverse().join("") as any)!
          : ctx.text!
      );
      ctx.reply("حله، شماره تلفن کارفرما رو بفرست").then(() => {
        robot.setStep("start9");
      });
    }
  });
  robot.step("start9", () => {
    let pdf = pdfs.find((x) => {
      return x.id == ctx.from.id.toString();
    });
    if (pdf) {
      pdf.setEmployer(
        "telephone",
        Number(p2a(ctx.text as any))
          ? toFarsiNumber(ctx.text?.split("").reverse().join("") as any)!
          : ctx.text!
      );
      ctx.reply("حله، شماره موبایل کارفرما رو بفرست").then(() => {
        robot.setStep("start10");
      });
    }
  });
  robot.step("start10", () => {
    let pdf = pdfs.find((x) => {
      return x.id == ctx.from.id.toString();
    });
    if (pdf) {
      pdf.setEmployer(
        "mobile",
        Number(p2a(ctx.text as any))
          ? toFarsiNumber(ctx.text?.split("").reverse().join("") as any)!
          : ctx.text!
      );
      ctx
        .reply(
          "اقا تبریک میگم، اطلاعات رو گرفتم حالا بریم سراغ اطلاعات پروژه، نوع پروژه رو بفرست \n مثال :‌ نرم افزار ،سخت افزار، بد افزار .. "
        )
        .then(() => {
          robot.setStep("start11");
        });
    }
  });
  robot.step("start11", () => {
    let pdf = pdfs.find((x) => {
      return x.id == ctx.from.id.toString();
    });
    if (pdf) {
      pdf.setProject("plat1", ctx.text!);
      ctx
        .reply("اوکی، حالا پلتفرم کلی پروژه رو بفرست، مثل : موبایل")
        .then(() => {
          robot.setStep("start12");
        });
    }
  });
  robot.step("start12", () => {
    let pdf = pdfs.find((x) => {
      return x.id == ctx.from.id.toString();
    });
    if (pdf) {
      pdf.setProject("plat2", ctx.text!);
      ctx
        .reply("اوکی، حالا پلتفرم تخصصی پروژه رو بفرست، مثل : اندروید")
        .then(() => {
          robot.setStep("start13");
        });
    }
  });
  robot.step("start13", () => {
    let pdf = pdfs.find((x) => {
      return x.id == ctx.from.id.toString();
    });
    if (pdf) {
      pdf.setProject("plat3", ctx.text!);
      ctx
        .reply("اوکی، حالا توضیح پروژه رو بفرست، مثل :برنامه موبایل فروشگاهی")
        .then(() => {
          robot.setStep("start14");
        });
    }
  });
  robot.step("start14", () => {
    let pdf = pdfs.find((x) => {
      return x.id == ctx.from.id.toString();
    });
    if (pdf) {
      pdf.setProject("description", ctx.text!);
      ctx
        .reply(
          "اوکی، حالا قابلیت های پروژه رو بفرست، مثل : سیستم بازاریابی، کد تخفیف "
        )
        .then(() => {
          robot.setStep("start15");
        });
    }
  });
  robot.step("start15", () => {
    let pdf = pdfs.find((x) => {
      return x.id == ctx.from.id.toString();
    });
    if (pdf) {
      pdf.setProject("feature", ctx.text!);
      ctx
        .reply(
          "اوکی، حالا صفحات پروژه رو بفرست، مثل : ورود، ثبت نام و.. \n نکته :‌اگه پروژه صفحه ای نداره میتونی بگی صفحه ای ندارد یا تعاملی نیست و.. از این چرتو پرتا"
        )
        .then(() => {
          robot.setStep("start16");
        });
    }
  });
  robot.step("start16", () => {
    let pdf = pdfs.find((x) => {
      return x.id == ctx.from.id.toString();
    });
    if (pdf) {
      pdf.setProject("pages", ctx.text!);
      ctx
        .reply("اوکی، حالا مدت زمان پروژه رو بفرست، مثل :  یک ماه و دو روز")
        .then(() => {
          robot.setStep("start17");
        });
    }
  });
  robot.step("start17", () => {
    let pdf = pdfs.find((x) => {
      return x.id == ctx.from.id.toString();
    });
    if (pdf) {
      pdf.setProject("time", ctx.text!);
      ctx
        .reply("اوکی، حالا مدت زمان پشتیبانی از پروژه رو بفرست، مثل :‌ دو ماه")
        .then(() => {
          robot.setStep("start177");
        });
    }
  });
  robot.step("start177", () => {
    let pdf = pdfs.find((x) => {
      return x.id == ctx.from.id.toString();
    });
    if (pdf) {
      pdf.setProject("timeSupport", ctx.text!);
      ctx.reply("اوکی، حالا مبلغ پروژه رو بفرست، مثل : 5000000").then(() => {
        robot.setStep("start18");
      });
    }
  });
  robot.step("start18", () => {
    let pdf = pdfs.find((x) => {
      return x.id == ctx.from.id.toString();
    });
    if (pdf) {
      pdf.setProject(
        "pay",
        Number(p2a(ctx.text as any))
          ? Number(p2a(ctx.text as any))!
          : 0 as any
      );
      ctx.reply("اوکی حالا امضای توسعه‌دهنده رو بفرست").then(() => {
        robot.setStep("start19");
      });
    }
  });
  robot.step("start19", async () => {
    let pdf = pdfs.find((x) => {
      return x.id == ctx.from.id.toString();
    });
    if (pdf) {
      let buffer = await ctx.telegram.download(ctx.media);
      pdf.setProject("sign1", buffer);

      ctx.reply("اوکی حالا امضای کارفرما رو بفرست").then(() => {
        robot.setStep("start20");
      });
    }
  });
  robot.step("start20", async () => {
    let pdf = pdfs.find((x) => {
      return x.id == ctx.from.id.toString();
    });
    if (pdf) {
      let buffer = await ctx.telegram.download(ctx.media);
      pdf.setProject("sign2", buffer);
      let end = pdf.end();

      let filename = `قرارداد-${i}.pdf`;
      setTimeout(() => {
        ctx.telegram
          .sendDocument(ctx.chat.id, end, {
            filename,
            replyToMsgId: ctx.id,
          })
          .then(() => {
            fs.unlink(end,()=>{});
            robot.setStep("start");
          });
      }, 5000);
      pdfs = pdfs.filter((x) => {
        x.id == ctx.from.id.toString();
      });
    }
  });
});

// interface Data {
//   data: {
//     programmer: {
//       name: string;
//       nationalId: string;
//       nationalCode: string;
//       telephone: string;
//       mobile: string;
//     };
//     employer: {
//       name: string;
//       nationalId: string;
//       nationalCode: string;
//       telephone: string;
//       mobile: string;
//     };
//     project: {
//       plat1: string;
//       plat2: string;
//       plat3: string;
//       description: string;
//       feature: string;
//       pages: string;
//       time: string;
//       pay: string;
//       sign1: Buffer;
//       sign2: Buffer;
//     };
//   };
// }

bot.run();
