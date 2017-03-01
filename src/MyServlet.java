import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by Vasily Danilin on 01.03.2017.
 */
@WebServlet(name = "MyServlet")
public class MyServlet extends HttpServlet {
    @Override
    public void init() throws ServletException {
        super.init();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charset=utf-8");

        PrintWriter pw = resp.getWriter();
        double a = Double.parseDouble(req.getParameter("a"));
        double b = Double.parseDouble(req.getParameter("b"));
        double c = Double.parseDouble(req.getParameter("c"));
        double d = b*b - 4*a*c;
        if (d < 0)
            pw.write("No roots");
        else
        if (d == 0)
            pw.write( ""+(b/(2*a)) );
        else
            pw.write((b+Math.sqrt(d))/(2*a) + " " + (b-Math.sqrt(d))/(2*a));
    }
}
