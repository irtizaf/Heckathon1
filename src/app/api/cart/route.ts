import { UsersTable, db, User, NewUser } from "@/lib/drizzle";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

const newEntry: NewUser = {
  id: 1,
  userid: "13",
  productid: "P003",
  title: "trouser Product",
  price: 30,
  image: "trouser.jpg",
  quantity:2
};

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("useriid");
  if (cookie?.value){
    console.log("cookies are ", cookie?.value);
    const retrive = await db
      .select()
      .from(UsersTable)
      .where(eq(UsersTable.userid, `${cookie?.value}`));
    console.log("get request is triggered...", retrive);
    return NextResponse.json({ message1: retrive });
  }
  return NextResponse.json({
    message: "You are not authenticated user Please SIGN-IN to continue"
  })
}

export async function POST(req: NextRequest) {
  const { id, userid, productid, title, price, image,quantity } = await req.json();

  const responseObject: NewUser = {
    id: id,
    userid: userid,
    productid: productid,
    title: title,
    price: price,
    image: image,
    quantity : quantity

  };
  const sendData = await db
    .insert(UsersTable)
    .values(responseObject)
    .returning();
  return NextResponse.json({ message1: sendData });
}

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  const productID = req.nextUrl.searchParams.get("productId");

  if (productID !== null) {
    let id: number = parseInt(productID);
    console.log(id);

    const deletedProduct = await db.delete(UsersTable).where(eq(UsersTable.id, id)).returning({ name: UsersTable.title });

    return NextResponse.json({
      message: deletedProduct,
    });
  } else {
    return NextResponse.json({

      message: "Product ID not found in the URL.",
    });
  }
};

